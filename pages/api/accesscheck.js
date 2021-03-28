import { getSession } from 'next-auth/client';

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content: 'Welcome',
    });
  } else {
    res.send({
      error: 'You must be logged in to view this page.',
    });
  }
};
// Use this code if needed for admin access
// const [content, setContent] = useState();
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('/api/accesscheck');
//       const json = await res.json();
//       if (json.content) {
//         setContent(json.content);
//       }
//     };
//     fetchData();
//   }, [session]);
