// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status(200).json([1, 2, 3].map(getCategory));
};

export const getCategory = (i) => ({
  id: i,
  name: categories[i - 1],
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  created_at: new Date(2021, 3, 20).toISOString(),
  updated_at: new Date(2021, 3, 20).toISOString(),
  created_by: {
    id: 1,
    name: 'John Doe',
  },
});

const categories = ['Education systems', 'Parenting'];
