require 'rubygems'
require 'json'


file = File.read('../data/skills.json')
skills = JSON.parse(file)


def sort_section(section)
  section["groups"] = sort_groups(section["groups"])
  section
end

def group_pri(group)
  levels = group["subgroups"].collect do |g|
    case g["level"]
    when 1
      200
    when 2
      100
    when 3
      50
    when 4
      20
    when 5
      10
    else
      0
    end
  end
  levels.inject(:+)
end

def sort_groups(groups)
  groups.sort {|a,b| group_pri(b) <=> group_pri(a)}
end

skills.each_with_index do |section,index|
  skills[index] = sort_section(section)
end

outfile = File.new("new.json", "w")
outfile.puts (skills.to_json)
outfile.close
