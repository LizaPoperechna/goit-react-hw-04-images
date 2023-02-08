import axios from "axios";

export const fetchImage = async (query, page) => {
    const response = await axios.get(`https://pixabay.com/api/`, {
            method: 'get',
            params: {
                key: '31496165-871731723b56e172d6ed684e7',
                q: query,
                page: page,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 12,
                safesearch: true,
            }
    });

    return response.data;
    
}
