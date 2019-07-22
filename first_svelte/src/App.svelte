<script>
  import axios from "axios";
  export let name;

  let aTags = new Array();
  let ai = "fafa";
  let tagname = "svelte";
  let mostrar = false
  function getSheet() {
    mostrar = true
    aTags = new Array();
    console.log(tagname ,"lele")
    axios({
      method: "get",
      url: `http://192.168.1.83:5100/?tagname=${tagname}}`
    })
      .then(res => {
        let htmlParser = new DOMParser(); // não está definido o DOMParser................, secalhar só se este .js estivesse num html
        // Pois, não há document nem windoww aqui .....
        //   let headers = res.headers;
        //   let rawHtml = res.data;
        //   console.log(rawHtml, "HTML.");
        //   console.log(headers, "headers.");
        // let html = htmlParser.parseFromString(rawHtml, "text/html")

        /* New stuff */
        if (res.data.success) {
          console.log(res.data);
          let html = htmlParser.parseFromString(
            res.data.html.bodyTag,
            "text/html"
          );
          let aux = Array.from(html.getElementsByTagName("a"));

          for (let tag of aux) {
            if (validTag(tag)) {
              console.log(tag.href.substr(22, tag.href.length));
              aTags.push(tag);
            }
          }
          aTags = [...aTags]; //Copiar o array para sim mesmo, para ficar reativo.
          // console.log(aTags);

          // aTags.filter(tag => {
          //   if (tag.ref.includes("/tagged")) return true;
          //   return false;
          // });
        } else {
          console.log(res.data, "DEu merda!!!");
        }
      })
      .catch(err => {
        console.log(err, "merda");
      });
  }
  let validTag = tag => {
    if (tag.href.includes("/questions/")) {
      // console.log(typeof tag.innerHTML);

      if (typeof tag.innerHTML == "string") {
        let splitag = tag.innerHTML.split(" ");
        // console.log(splitag.length)

        if (
          splitag[0] == "" ||
          splitag.includes("<div") ||
          splitag.includes("<span") ||
          splitag.includes("<svg")
        ) {
          // console.log(splitag[0]);
          return false;
        }
        if (splitag.length > 2) {
          let aux2 = true;
          splitag[0] == "\n"
            ? (aux2 = false) //&& console.log("é null") funciona este inline cenas com o (&&)
            : 1; //console.log(typeof splitag.toString());
          // console.log(tag.innerHTML.toString());
          return aux2;
        }
        // else if(splitag.toString()[0] == " ") return false;
        else return false;
        /***/
        return true;
      }
    }
    return false;
  };
</script>

<style>
  h1,
  h4 a {
    color: purple;
  }
</style>

<h1>Hello {tagname.toUpperCase()}! {ai}</h1>
<input type="text" placeholder={tagname} bind:value={tagname} />
<button on:click={getSheet}>Procurar por tag</button>
<div class="putaborder">
 {#if aTags.length > 0}
  {#each aTags as at}
    {#if validTag(at)}
      <h4>
        <a
          href={'https://stackoverflow.com/' + at.href.substr(22, at.href.length)}>
          {at.innerHTML}
        </a>
      </h4>
    {/if}
  {/each}
  {:else} 
    {#if mostrar==true}
      <h1>A tag que procuras não é válida!!!!</h1>
    {/if}
  {/if}
</div>
