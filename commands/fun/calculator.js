module.exports={
    name:"calculator",
    aliases:["calc"],
    category:"fun",
    usage:"calc",
    timeout:"20000", //20 seconds
    run: async(client,message,args)=>{
      const simplydjs= require("simply-djs")
      simplydjs.calculator(message,{
        embedColor:"GREEN"
      })
    }
  }
