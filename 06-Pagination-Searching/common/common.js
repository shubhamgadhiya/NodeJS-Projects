module.exports.getDataByPaginate = (req, keys) => {
    let aggregate_options = [];
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let sort = parseInt(req.query.sort_order) || -1;
  
    const options = {
      page,
      limit,
      collation: { locale: "en" },
    };

    let match = {};
  
    //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
    if (req.query.q && keys) match[keys] = { $regex: req.query.q, $options: "i" };
  
    //filter by date
    if (req.query.date) {
      let d = moment(req.query.date);
      let next_day = moment(d).add(1, "days");
  
      match.date = { $gte: new Date(d), $lt: new Date(next_day) };
    }
  
    aggregate_options.push({ $match: match });
  
    //SORTING -- THIRD STAGE
    let sortOrder = sort && sort === "asc" ? 1 : -1;
    if (req.query.sortField) {
      aggregate_options.push({ $sort: { [req.query.sortField]: sortOrder } });
    } else {
      aggregate_options.push({ $sort: { date: sortOrder } });
    }
  
       return { aggregate_options, options };
  };