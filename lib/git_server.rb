module GitServer
  REPO_PATH = '/Users/shadab/Documents/work/logstasher'
  GitRepo = Git.open(REPO_PATH, :log => Logger.new(STDOUT))
  class App < Sinatra::Base
    get '/' do
      @repo = GitRepo.repo
      @commits = GitRepo.log
      haml :index
    end

    get '/commit/:sha' do |sha|
      commit = GitRepo.gcommit(sha)
      haml :commit, :layout => false, :locals => {:commit => commit}, :ugly => true
    end

    get '/tree/:sha' do |sha|
      tree = GitRepo.gtree(sha)
      haml :tree, :layout => false, :locals => {:tree => tree}, :ugly => true
    end

    get '/blob/:sha' do |sha|
      blob = GitRepo.gblob(sha)
      haml :blob, :layout => false, :locals => {:blob => blob}, :ugly => true
    end

    get '*' do
      haml :'404'
    end

  end
end