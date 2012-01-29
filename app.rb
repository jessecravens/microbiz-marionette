require 'compass' #must be loaded before sinatra
require 'sinatra'
require 'sinatra/reloader' if development?
require 'haml'
require 'json'

set :port, 3333

get "/" do
  haml :layout
end
