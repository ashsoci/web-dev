function submitProductForm()
{
	console.log("Submitting");
	event.preventDefault();
	var product = document.getElementById('product-form');
	
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
		windows: product.elements.namedItem('windows').checked,
		mac: product.elements.namedItem('mac').checked,
		linux: product.elements.namedItem('linux').checked,
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