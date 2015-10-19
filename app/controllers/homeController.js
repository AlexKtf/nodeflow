exports.home = function (req, res) {
  res.render('home/home',
    {
      title: 'Hey',
      message: 'Hello there!'
    }
  );
};
