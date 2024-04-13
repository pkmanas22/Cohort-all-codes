import prisma from "@/db";

async function getUserDetails() {
  const user = await prisma.user.findFirst({});
  return {
    username: user?.username,
    password: user?.password,
  }
}

export default async function Home() {
  const { username, password } = await getUserDetails()
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {username}
          </div>

          {password}
        </div>
      </div>
    </div>
  );
}
