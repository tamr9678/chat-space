Rails.application.routes.draw do

  devise_for :users
  # get 'messages/index'
  root to:"messages#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
end
s