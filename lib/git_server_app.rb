Bundler.require
require 'git_server'
require 'version'
require 'tempfile'
require 'base64'

module GitServer
  class App
    configure do
      set :root, File.join(File.dirname(__FILE__), '..')
      set :public_folder, File.join(root, 'public')
      set :views, File.join(root, 'views')
      enable :sessions
    end
  end
end