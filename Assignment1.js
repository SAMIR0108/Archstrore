let axios = require('axios');
let fs = require('fs');
let express = require('express')
let app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


async function fetchData(apiUrl) {
let urls=[]
await axios.get(apiUrl)
  .then(response => {
    
    for(let i of response.data.links){
        if(i.url){
            if(urls.indexOf(i.url)==-1){
                    urls.push(i.url)

            }
        }
    }
    console.log(urls)

  })
  .catch(error => {
    
    console.error('Error fetching data:', error);
  });

  try {
   let data=[]
   let pageList={}
    const responses = await Promise.all(urls.map(url => axios.get(url)));
    
    
    responses.forEach((response, index) => {
      const outputFile = `response_${index + 1}.txt`; 
      fs.writeFile(outputFile, JSON.stringify(response.data, null, 2), err => {
        if (err) {
          console.error(`Error writing to ${outputFile}:`, err);
        } else {
          console.log(`Response ${index+1} data has been saved to ${outputFile}`);
        }

        });

     pageList["data_"+outputFile]=response.data
     data=[...data,...response.data.data]
    });
    fs.writeFile("resopnse_all_data.txt", JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error(`Error writing to resopnse_all_data:`, err);
      } else {
        console.log(`Response all data has been saved to resopnse_all_data `);
      }
    });
    
    return {pageList,data}
  } catch (err) {
    console.error('Error fetching data:', error);
    let error=err?err:"internal server error"
    return {error:error}
  }

}


app.get("/getTransformData",async(req,res)=>{
let url="https://catfact.ninja/breeds"
   let url_data= await fetchData(url).catch(err=>{
    return {error:err}
   })

   if(url_data.error){
    let error= url_data.error?url_data.error:"data not found"
    return res.send({error})
   }

   let transformedData = {};

   url_data.data.forEach(breed => {
    let { country, breed: breedName, origin, coat, pattern } = breed;

    
    let cleanCountry = country.replace(/ \(.*\)/, '');

    
    if (!transformedData[cleanCountry]) {
        transformedData[cleanCountry] = [];
    }

    
    transformedData[cleanCountry].push({
        breed: breedName,
        origin,
        coat,
        pattern
    });

     });
      
   return res.send({data:transformedData})
})

app.get("/getUrlData",async(req,res)=>{
    let url="https://catfact.ninja/breeds"
       let url_data= await fetchData(url).catch(err=>{
        return {error:err}
       })
    
       if(url_data.error){
        let error= url_data.error?url_data.error:"data not found"
        return res.send({error})
       }

       return res.status(200).send({data:url_data.data})
})

app.listen(3050)


