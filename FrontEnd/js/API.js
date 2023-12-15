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

export { fetchData };