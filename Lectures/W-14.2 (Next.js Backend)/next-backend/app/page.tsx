import axios from "axios";

async function getUserDetails() {
  // await new Promise(r => (setTimeout(r, 5000)))     // artificial delay
  // By defalut next will load the page, after data fetched successfully then it display the page. In this case our page is stucked.

  // So we need to create a loading.tsx file inside our app folder.
  // Next supports that so that instead of showing page is stucked, it renders loading file.
  const response = await axios.get("http://localhost:3000/api/user")
  return response.data;
}

// async component - next supports async component
export default async function Home() {
  const userDetails = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {userDetails?.name}
          </div>

          {userDetails?.email}
        </div>
      </div>
    </div>
  );
}
