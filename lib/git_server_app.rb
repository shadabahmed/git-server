Bundler.require
require File.expand_path('../git_server', __FILE__)
require File.expand_path('../haml', __FILE__)
require 'sinatra/asset_pipeline'

module GitServer
  class App
    register Sinatra::AssetPipeline

    configure do
      set :root, File.join(File.dirname(__FILE__), '..')
      set :public_folder, File.join(root, 'public')
      set :views, File.join(root, 'views')
      enable :sessions
    end
  end
end