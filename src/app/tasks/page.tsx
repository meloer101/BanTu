function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "http://localhost:3000";
}

async function TasksPage() {
  const response = await fetch(`${getBaseUrl()}/api/tasks`, {
    cache: "no-store",
  });
  const tasks = await response.json();

  console.log("tasks:", tasks);

  return <div>TasksPage</div>;
}
export default TasksPage;
