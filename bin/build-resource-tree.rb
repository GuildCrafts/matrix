require 'rubygems'
require 'json'


file = File.read('../data/skills.json')
template = File.read('../resources/template.md')
skills = JSON.parse(file)


skills.each do |section|
  section_name = section["section"]
  dir = "../resources/#{section_name}"
  next if section_name == "Template"
  Dir.mkdir dir unless File.exists?(dir)

  puts section_name

  section["groups"].each do |group|
    group_name = group["group"]
    next if group_name == "Template"
    puts "-- #{group_name}"
    file_name = "../resources/#{section_name}/#{group_name}.md"
    next if File.exists?(section_name)
    outfile = File.new(file_name, "w")
    outfile.puts (template.gsub("groupname",group_name))
    outfile.close
  end
end
