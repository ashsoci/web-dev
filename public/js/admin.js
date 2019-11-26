var currentTab = null;

var page_homepage = document.getElementById("homepage-controls");
var page_slideshow = document.getElementById("slideshow-controls");
var page_about = document.getElementById("about-controls");
var page_products = document.getElementById("products-controls");
var page_contact = document.getElementById("contact-controls");

page_homepage.style.display = "block";
page_slideshow.style.display = "none";
page_about.style.display = "none";
page_products.style.display = "none";
page_contact.style.display = "none";

var checkExist = setInterval(function() {
    if (document.getElementById('admin-active')) {
       console.log("Exists!");
       currentTab = document.getElementById('admin-active');
       clearInterval(checkExist);
    }
 }, 100);

$(document).on("click","div.admin-link", function () {
    var click = $(this).attr('id');
    if(click != "admin-active")
    {
        $(currentTab).attr('id', "none");
        currentTab = $(this);
        $(this).attr('id', "admin-active");
		switch($(this).text())
		{
			case "Homepage":
				page_homepage.style.display = "block";
				page_slideshow.style.display = "none";
				page_about.style.display = "none";
				page_products.style.display = "none";
				page_contact.style.display = "none";
				break
			
			case "Slideshow":
				page_homepage.style.display = "none";
				page_slideshow.style.display = "block";
				page_about.style.display = "none";
				page_products.style.display = "none";
				page_contact.style.display = "none";
				break
				
			case "About Us":
				page_homepage.style.display = "none";
				page_slideshow.style.display = "none";
				page_about.style.display = "block";
				page_products.style.display = "none";
				page_contact.style.display = "none";
				break
				
			case "Games":
				page_homepage.style.display = "none";
				page_slideshow.style.display = "none";
				page_about.style.display = "none";
				page_products.style.display = "block";
				page_contact.style.display = "none";
				break
				
			case "Contact Us":
				page_homepage.style.display = "none";
				page_slideshow.style.display = "none";
				page_about.style.display = "none";
				page_products.style.display = "none";
				page_contact.style.display = "block";
				break
		}
    }
 });
 
 function submitForm()
 {
	 event.preventDefault();
	 var contact = document.getElementById('contact-form');
	 
	 var formData = 
	 {
		forename: contact.elements.namedItem('name').value,
        surname: contact.elements.namedItem('surname').value,
        email: contact.elements.namedItem('email').value,
        subject: contact.elements.namedItem('need').value,
        message: contact.elements.namedItem('message').value
	 }
	 
	 var ajax = new XMLHttpRequest();
	 ajax.open('post', './handlecontact');
	 ajax.setRequestHeader("Content-Type", "application/json");
	 ajax.send(JSON.stringify(formData)); 
 }