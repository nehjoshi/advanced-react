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
    // const [coffees, setCoffees] = useState<Coffee[]>([]);

    const getData = async () => {
        const rawData = await fetch(URL);
        return await rawData.json();
    }

    const { data: coffees, isLoading } = useQuery<Coffee[]>({
        queryFn: getData,
        queryKey: ["coffees"]
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <main className="w-full h-full flex justify-center items-center flex-col">
            <h1 className="text-blue-900 font-bold">Coffee Page</h1>
            <div className="flex flex-col">
                {coffees?.map((coffee) => (
                    <div key={coffee.id}>{coffee.title}</div>
                ))}
            </div>
        </main>
    )
}

export default Fun;