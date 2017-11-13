$(document).ready(function() {
  $('#searchUser').on('click', function(e) {
    let username = $('.form-control').val();
    $.ajax({
      url: 'https://api.github.com/search/users?q=' + username,
      data: {
        client_id: 'c719a2187e1965e549d2',
        client_secret: '5d62c1326393082fe5242d75e60a4d3908d3d3d1',
        sort: 'created: asc',
        per_page: 2
      }
    }).done(function(users) {
      $.each(users.items, function(index, user) {
        $.ajax({
          url: 'https://api.github.com/users/' + user.login,
          data: {
            client_id: 'c719a2187e1965e549d2',
            client_secret: '5d62c1326393082fe5242d75e60a4d3908d3d3d1'

          }
        }).done(function(user) {
          $.ajax({
            url: 'https://api.github.com/users/' + user.login + '/repos',
            data: {
              client_id: 'c719a2187e1965e549d2',
              client_secret: '5d62c1326393082fe5242d75e60a4d3908d3d3d1',
              sort: 'created: asc',
              per_page: 3
            }
          }).done(function(repos) {

            $.each(repos, function(index, repo) {
              $('#' + user.login + 'repos').append(`
                    <div class="well hidden" id="${user.login}${index}">
                      <div class="row">
                        <div class="col-md-7">
                          <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3">
                          <span class="label label-default">Forks: ${repo.forks_count}</span>
                          <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                          <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                          <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                        </div>
                      </div>
                    </div>
                  `);
              $(`#${user.login}repositories`).on('click', function(e) {
                console.log("CLICK EN : " + user.login)
                $(`#${user.login}${index}`).toggleClass('hidden');
              });
            });
          });
          $('#profile').append(`
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                        <a target="_blank" class="btn btn-primary btn-block" id="${user.login}repositories">View Repositories</a>

                      </div>
                      <div class="col-md-9">
                      <span class="label label-default">Public Repos: ${user.public_repos}</span>
                      <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                      <span class="label label-success">Followers: ${user.followers}</span>
                      <span class="label label-info">Following: ${user.following}</span>
                      <br><br>
                      <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                      </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="${user.login}repos"></div>
              `);
        });

      })
    })
  });

});
