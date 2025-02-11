import { useQuery } from "@tanstack/react-query";

type Coffee = {
    title: string,
    description: string,
    ingredients: string[],
    image: string,
    id: number
}
const URL = "https://api.sampleapis.com/coffee/hot";

const Fun = () => {

    const getData = async () => {
        const rawData = await fetch(URL);
        return await rawData.json();
    }

    const { data: coffees, isLoading, dataUpdatedAt } = useQuery<Coffee[]>({
        queryFn: getData,
        queryKey: ["coffees"]
    });

    console.log("Data updated at: ", new Date(dataUpdatedAt).toLocaleString());

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <main className="w-full h-full flex justify-center items-center flex-col">
            <h1 className="text-blue-900 font-bold">Coffee Page</h1>
            <div className="flex flex-col">
                {coffees?.map((coffee) => (
                    <div key={coffee.id} className="mt-3">
                        <h2 className="text-lg font-bold">{coffee.title}</h2>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Fun;