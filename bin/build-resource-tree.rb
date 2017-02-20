require 'rubygems'
require 'json'


file = File.read('../data/skills.json')
template = File.read('../resources/template.md')
skills = JSON.parse(file)


skills.each do |section|
  section_name = section["section"]
  next if section_name == "Template"
  Dir.mkdir "../resources/#{section_name}"  unless File.exists?(section_name)
end
