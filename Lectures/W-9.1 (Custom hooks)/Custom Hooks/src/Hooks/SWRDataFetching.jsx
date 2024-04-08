import axios from "axios"
import useSWR from "swr"

// const fetcher = (url) => fetch(url).then((res) => res.json());
const fetcher1 = async function (url) {
    const data = await fetch(url);
    const json = await data.json();
    return json;
};

const fetcher = (url) => {
    return fetch(url)
        .then((res) => res.json())
}

// If we include curly braces in a function, we must use the 'return' keyword. If we omit curly braces, we can avoid using the 'return' statement. 

export default function SWRDataFetching() {
    // The cleaner way to use useSWR
    const { data, error, isLoading } = useSWR('https://sum-server.100xdevs.com/todos', fetcher)


    /*const { data, error, isLoading } = useSWR(
        'https://sum-server.100xdevs.com/todos',
        async function (url) {

        // using axios
            // const response = await axios.get(url);
            // console.log(response.data);
            // return response.data;

        // using fetch
            return fetch(url)
                .then(function (res) {
                    return res.json();
                })
                .then(function (json) {
                    // console.log(json);
                    return json;
                })
        }
    )*/

    // console.log(data.todos.length);
    // console.log(error);
    // console.log(isLoading);
    if (error) return <div>Failed to load</div>
    return (
        isLoading ? <div>Loading...</div> : <div>Total {data.todos.length} todos</div>
    )
}