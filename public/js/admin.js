function createNewProduct()
{
	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		console.log(this);
		console.log(this.status);
		
		var but = document.getElementById("productCreateButton");
		but.setAttribute("disabled", "true");
		but.innerHTML = "Creating Product...";
		
		setTimeout(function() 
		  {
			location.reload(true);  //Refresh page
		  }, 5000);
	};
	
	ajax.open('post', '/create-product');
	ajax.setRequestHeader("Content-Type", "application/json");
	ajax.send();
}

function createNewTeam()
{
	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		console.log(this);
		console.log(this.status);
		
		var but = document.getElementById("teamCreateButton");
		but.setAttribute("disabled", "true");
		but.innerHTML = "Creating New Team Member...";
		
		setTimeout(function() 
		  {
			location.reload(true);  //Refresh page
		  }, 5000);
	};
	
	ajax.open('post', '/create-team');
	ajax.setRequestHeader("Content-Type", "application/json");
	ajax.send();
}

function submitTeamForm()
{
	console.log("Submitting");
	event.preventDefault();
	var team = document.getElementById('team-form');

	var formData = 
	{
		id: team.elements.namedItem('id').value,
		name: team.elements.namedItem('name').value,
		bio: team.elements.namedItem('bio').value,
		photo: team.elements.namedItem('photo').value
	}

	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		console.log(this);
		console.log(this.status);
		if (this.readyState == 4 && this.status == 201) {
			var data = JSON.parse(this.responseText);
			console.log("success");

			var success = document.getElementById('success');
			success.removeAttribute("hidden")
		}
	};
	
	ajax.open('post', '/update-team');
	ajax.setRequestHeader("Content-Type", "application/json");
	ajax.send(JSON.stringify(formData)); 
}

function submitProductForm()
{
	console.log("Submitting");
	event.preventDefault();
	var product = document.getElementById('product-form');
	
	var isWindows = product.elements.namedItem('windows').checked ? '1' : '0';
	var isMac = product.elements.namedItem('mac').checked ? '1' : '0';
	var isLinux = product.elements.namedItem('linux').checked ? '1' : '0';
	
	var publishedPage = product.elements.namedItem('published').checked ? '1' : '0';
	console.log("Published", publishedPage);

	var formData = 
	{
		id: product.elements.namedItem('id').value,
		title: product.elements.namedItem('name').value,
		pathToImg: product.elements.namedItem('thumbnail-name').value,
		productBanner: product.elements.namedItem('banner-name').value,
		productSlide1: product.elements.namedItem('slide-1-name').value,
		productSlide2: product.elements.namedItem('slide-2-name').value,
		productSlide3: product.elements.namedItem('slide-3-name').value,
		productSlide4: product.elements.namedItem('slide-4-name').value,
		productSlide5: product.elements.namedItem('slide-5-name').value,
		productHeader1: product.elements.namedItem('headline-1').value,
		productHeader2: product.elements.namedItem('headline-2').value,
		productHeader3: product.elements.namedItem('headline-3').value,
		productFeature1: product.elements.namedItem('paragraph-1').value,
		productFeature2: product.elements.namedItem('paragraph-2').value,
		productFeature3: product.elements.namedItem('paragraph-3').value,
		windows: isWindows,
		mac: isMac,
		linux: isLinux,
		productRam: product.elements.namedItem('ram').value,
		productHdd: product.elements.namedItem('hdd').value,
		published: publishedPage
	}

	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		console.log(this);
		console.log(this.status);
		if (this.readyState == 4 && this.status == 201) {
			var data = JSON.parse(this.responseText);
			console.log("success");

			var success = document.getElementById('success');
			success.removeAttribute("hidden")
		}
	};
	
	ajax.open('post', '/update-product');
	ajax.setRequestHeader("Content-Type", "application/json");
	ajax.send(JSON.stringify(formData)); 
}

function submitHomepageForm()
{
	console.log("Submitting");
	event.preventDefault();
	var homepage = document.getElementById('homepage-form');

	var formData = 
	{
		logo: homepage.elements.namedItem('logo').value,
		slide1: homepage.elements.namedItem('slide1').value,
		slide2: homepage.elements.namedItem('slide2').value,
		slide3: homepage.elements.namedItem('slide3').value,
		slide4: homepage.elements.namedItem('slide4').value,
		slide5: homepage.elements.namedItem('slide5').value,
		jumbotitle: homepage.elements.namedItem('jumbo-title').value,
		jumbotext: homepage.elements.namedItem('jumbo-text').value,
		trititle1: homepage.elements.namedItem('tri-title1').value,
		trititle2: homepage.elements.namedItem('tri-title2').value,
		trititle3: homepage.elements.namedItem('tri-title3').value,
		tritext1: homepage.elements.namedItem('tri-text1').value,
		tritext2: homepage.elements.namedItem('tri-text2').value,
		tritext3: homepage.elements.namedItem('tri-text3').value
	}

	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		console.log(this);
		console.log(this.status);
		if (this.readyState == 4 && this.status == 201) {
			var data = JSON.parse(this.responseText);
			console.log("success");

			var success = document.getElementById('success');
			success.removeAttribute("hidden")
		}
	};
	
	ajax.open('post', '/update-homepage');
	ajax.setRequestHeader("Content-Type", "application/json");
	ajax.send(JSON.stringify(formData)); 
}