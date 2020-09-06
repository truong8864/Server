const Att_AnnualDetailModel= require ('../../modelsnew/models/Att_LeaveDay.model')


module.exports.getAll = async (req, res) => {
  try{
    const result = await Att_AnnualDetailModel.find({});
    return res.status(200).json(result);
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};

module.exports.getByID = async (req, res) => {
  try{
    const { ID } = req.params;
    const result = await Att_AnnualDetailModel.find({ ID: ID });
    return res.status(200).json(result);    
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};

module.exports.getWithFilter = async (req, res) => {
  try{
    const filter = req.query;
    const result = await Att_AnnualDetailModel.find(filter);
    return res.status(200).json(result);   
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};

module.exports.update = async (req, res) => {
  try{
    const { ID } = req.params;
    const { data } = req.body;
    const result = Att_AnnualDetailModel.findOneAndUpdate({ ID: ID }, data);
    return res.status(200).json(result);   
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};

module.exports.create = async (req, res) => {
  try{
    const { data } = req.body;
    const result = await Att_AnnualDetailModel.create({ data });
    return res.status(200).json(result); 
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};

module.exports.delete = async (req, res) => {
  try{
    const { ID } = req.params;
    const result = await Att_AnnualDetailModel.findOneAndUpdate(
      { ID: ID },
      { IsDelete: true }
    );
    res.status(200).json(result);
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};
