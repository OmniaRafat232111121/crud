//arrays
//json

//CRUD---->create,retrieve,update,delete
// var products=
// [
//    {name:"mobile",category:"galaxi",price:2123,desc:"test"},
//    {name:"mobile",category:"iphone",price:23322,desc:"test"},
//    {name:"laptop",category:"lenovo",price:48834,desc:"test"},
//    {name:"flash momory",category:"memory",price:300,desc:"test"},
// ]

//UPDATE
//validation---data valid
//regular expression(advanced js)---rejex

//rejex---symbols,charachters (pattern)



var addBtn=document.getElementById("addBtn");
var nameInput=document.getElementById("name");
var categoryInput=document.getElementById("category");
var priceInput=document.getElementById("price");
var descInput=document.getElementById("desc");
var inputs=document.getElementsByClassName("form-control");
var products=[];
var currentIndex;

if(JSON.parse(localStorage.getItem("productsList"))!=null) //true
{
   products=JSON.parse(localStorage.getItem("productsList"));
   displayProducts();
}


addBtn.onclick=function(){
   if(nameInput.value!=""&&categoryInput.value!=""
   &&priceInput.value!=""&&descInput.value!="")
  {
   if(addBtn.innerHTML=="Add product")
   {
      addProduct();
   }
   else{
      updateProduct()
   }
  }
   else{
      alert("all fields should be filled")
   }
   
    displayProducts();
    resetForm()
}

function addProduct(){
   var product={
      name:nameInput.value,
      category:categoryInput.value,
      price:priceInput.value,
      desc:descInput.value
   }
   products.push(product);

   localStorage.setItem("productsList",JSON.stringify(products))
}

function displayProducts(){
   var trs="";
   for(var i=0;i<products.length;i++){
      trs+=
      `
      <tr>
         <td>${products[i].name}</td>
         <td>${products[i].category}</td>
         <td>${products[i].price}</td>
         <td>${products[i].desc}</td>
         <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
         <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>update</button></td>
      </tr>
      `
   }
   document.getElementById("tableBody").innerHTML=trs
}
function updateProduct(){
   var product=
   {
      name:nameInput.value,
      category:categoryInput.value,
      price:priceInput.value,
      desc:descInput.value
   }
   products[currentIndex]=product;
   localStorage.setItem("productsList",JSON.stringify(products))
}
function getProductInfo(index){
   nameInput.value=products[index].name;
   categoryInput.value=products[index].category;
   priceInput.value=products[index].price;
   descInput.value=products[index].desc;
   addBtn.innerHTML="Update product";
   currentIndex=index
}
//pop,shift,splice
function deleteProduct(index){
   products.splice(index,1);//4
   displayProducts();
   localStorage.setItem("productsList",JSON.stringify(products))
}
//move,improve
function resetForm()
{
    for(var i=0;i<inputs.length;i++){
       inputs[i].value=""
    }
}
function search(searchTxt)//ahmed
{
   var trs="";
   for(var i=0;i<products.length;i++){
      if(products[i].name.toLowerCase().includes(searchTxt.toLowerCase()))  //m==mobile
      {
         trs+=
         `
         <tr>
            <td>${products[i].name}</td>
            <td>${products[i].category}</td>
            <td>${products[i].price}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
         </tr>
         `
      }
      
   }
   document.getElementById("tableBody").innerHTML=trs
}

/////validation/////////////////////
var nameAlert=document.getElementById("nameAlert");
nameInput.onkeyup=function()
{
   var nameRejex=/^[A-Z][a-z]{3,7}$/;
   if(!nameRejex.test(nameInput.value))
   {
       addBtn.disabled="true";
       nameInput.classList.add("is-invalid");
       nameInput.classList.remove("is-valid");
       nameAlert.classList.remove("d-none")
   }
   else{
      addBtn.removeAttribute("disabled");
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
      nameAlert.classList.add("d-none")

   }
}

