require 'rubygems'
require 'json'


file = File.read('../data/skills.json')
template = File.read('../resources/template.md')
skills = JSON.parse(file)

skills.each do |section|
  section_name = section["section"]

  section["groups"].each do |group|
    group_name = group["group"]
    next if group_name == "Template"
    file_name = "../resources/#{section_name}/#{group_name}.md"
    resource_file = File.read(file_name)
    if template.to_s.gsub("groupname","") != resource_file.to_s.gsub(group_name,"")
      group["resource"] = true
      puts "found resources for #{group_name}"

    else
      group["resource"] = false
    end
  end
end

outfile = File.new('../data/skills.json', "w")
outfile.puts (skills.to_json)
outfile.close
