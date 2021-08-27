const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    category: 'status',
    description: "Dự báo thời tiết",
    run: async (client, message, args, cmd) => {
    
        weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Hãy cho địa điểm')

        if(result === undefined || result.length === 0) return message.channel.send('Lỗi địa điểm');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Dự báo thời tiết cho ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Múi giờ', `UTC${location.timezone}`, true)
        .addField('Loại bằng cấp', 'Celsius', true)
        .addField('Nhiệt độ', `${current.temperature}°`, true)
        .addField('Cường độ gió', current.winddisplay, true)
        .addField('Cảm thấy như', `${current.feelslike}°`, true)
        .addField('Độ ẩm', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}