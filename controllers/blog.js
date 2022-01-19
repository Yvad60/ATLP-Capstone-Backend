import articleModel from '../models/blog.js'

export const createNewArticle = async (req, res) => {
  let { content, title, author } = req.body
  if (!content || !title || !author) {
    return res.status(400).send({
      message: "Missing required input"
    });
  }
  try {
    const blogExist = await articleModel.findOne({ title: title })
    if (blogExist) {
      return res.status(409).json({ message: "article title taken" })
    }
    const newBlog = await articleModel.create({
      author: req.body.author,
      content: req.body.content,
      title: title

    })
    if (!newBlog) return res.sendStatus(500)
    return res.status(200).json(newBlog)
  } catch (error) {
    return res.send(error)
  }


}


export const getAllArticles = async (req, res) => {
  try {
    const post = await articleModel.find()
    return res.status(200).json(post)
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Error occured while getting articles"
    })
  }
}

export const updateArticle = async (req, res) => {
  const article = await articleModel.findOneAndUpdate(req.params.articleId, req.body);
  if (!article) {
    res.status(404).json({ message: "Article not found" });
  }
  res.status(0).json({})

}


export const getSingleArticle = (req, res) => {
  articleModel.findById(req.params.articleId)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while getting articles"
      })
    })
}

export const deleteArticle = () => {
  articleModel.findByIdAndDelete(req.params.articleId)
    .then((result) => {
      if (!result) {
        res.status(500).send({
          message: `article with id ${req.params.articleId} can't be found`
        })
      }
      else {
        res.send('article deleted successfully')
      }
    })
}