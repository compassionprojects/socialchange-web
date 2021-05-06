import elastic from '../../../elastic';

export default async (req, res) => {
  const { q } = req.query;
  const searchFields = [
    'title',
    'description',
    'intentions',
    'outcomes',
    'societal_change',
    'country',
    'category_name',
    'country_name',
  ];

  const results = await elastic.msearch({
    index: 'projects_index',
    body: searchFields.reduce((init, field) => {
      init.push({ index: 'projects_index' });
      init.push({ query: { match: { [field]: q } } });
      return init;
    }, []),
  });

  res.status(200).json({
    results: results.body.responses
      .flatMap((r) => r.hits && r.hits.hits)
      .filter((r) => r)
      .map((r) => r._source)
      .reduce((init, doc) => {
        // remove duplicates
        if (!init.map((d) => d.id).includes(doc.id)) init.push(doc);
        return init;
      }, []),
  });
};
