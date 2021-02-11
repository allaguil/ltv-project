// Fetch API
const ltvUrl = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=doesmith@example.com';



const getUser = async () => {

    try {
        const resp = await fetch(ltvUrl);

        if (!resp.ok) throw 'No se pudo realizar la peticion';

        const { first_name, last_name, address, email, phone_numbers, relatives } = await resp.json();

        return { first_name, last_name, address, email, phone_numbers, relatives };

    } catch (err) {
        throw err;
    }

}










