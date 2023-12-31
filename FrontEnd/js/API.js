const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
    }
};

const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Erreur lors de la requête POST :', error);
        throw error;
    }
};


const deleteData = async (url) => {
    try {

        const authToken = localStorage.getItem('authToken');
        
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        };

        
        const response = await fetch(url, options);

        if (!response.ok) {
            
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        
        console.error('Erreur lors de la requête DELETE :', error);
        throw error;
    }
};

export { fetchData, postData, deleteData };
