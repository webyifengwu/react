let arr = []
let obj ={
    "username":"",
    "password":""
}

obj.username = "一枫无"
obj.password = "159874asd"
console.log("{");
for (const key in obj) {
    console.log("\""+key+"\""+":"+"\""+obj[key]+"\"");
}
console.log("}");