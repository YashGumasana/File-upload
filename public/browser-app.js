console.log('browser-app');

const Name = document.getElementById('name');
const Price = document.getElementById('price');
const imageInputDOM = document.querySelector('#image')
const btn = document.getElementById('btn');
const containerDOM = document.querySelector('.container')
let imageValue;


imageInputDOM.addEventListener('change', async (e) => {
    const imageFile = e.target.files[0];
    // console.log(imageFile);
    const formData = new FormData();
    // console.log(formData);
    formData.append('image', imageFile);
    btn.disabled = true;
    btn.innerHTML = 'wait...';

    try {
        const { data: { image: { src } } } = await axios.post('/api/v1/file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log({ data: { image: { src } } });
        imageValue = src;
        console.log(imageValue + '***');
        btn.disabled = false;
        btn.innerHTML = 'Add Products';
    } catch (error) {
        imageValue = null;
        console.log(error);
    }
})



// setTimeout(async () => {
btn.addEventListener('click', async (e) => {
    if (imageValue) {

        e.preventDefault();
        console.log('click');
        let name = Name.value;
        let price = Price.value;
        console.log(name, price, imageValue);

        try {

            const product = { name: name, price: price, image: imageValue }
            await axios.post("/api/v1/file", product);
            console.log(product);
            fetchProducts();

        } catch (error) {
            console.log(error);
        }
    }
    else {

        console.log('waiiiiiit');
    }
})

// }, 3000);
// btn.innerHTML = 'Add Product';
const fetchProducts = async () => {
    try {
        const { data: products } = await axios.get('/api/v1/file');
        // console.log(products + '****');
        // console.log(Object.keys(products.image));
        // console.log(products);
        // console.log(products.file);

        // console.log(xyz);

        let productsDOM = ''

        for (const key in products.file) {


            productsDOM += `<article class="product">
                        <img src="${products.file[key].image}" alt="${products.file[key].name}" class="img"/>
                        <footer>
                        <p>${products.file[key].name}</p>
                        <span>$${products.file[key].price}</span>
                        </footer>
                        </article>`

        }
        containerDOM.innerHTML = productsDOM

        // const { name, image, price } = products;
        // console.log(products[]);
        // if (Object.hasOwnProperty.call(object, key)) {
        //     const element = object[key];

        // }
        // console.log(products[key].name);

        // console.log(products[price]);
        // const productsDOM = products.forEach((product) => {
        //     const { name, image, price } = product;
        //     // console.log(product[name]);
        //     console.log(name, image, price);
        //     return `<article class="product">
        //                 <img src="${product[image]}" alt="${name}" class="img"/>
        //                 <footer>
        //                 <p>${name}</p>
        //                 <span>$${price}</span>
        //                 </footer>
        //                 </article>`
        // }).join("");
        // console.log(productsDOM);
        // containerDOM.innerHTML = productsDOM
    } catch (error) {
        console.log(error);
    }

}

fetchProducts();

