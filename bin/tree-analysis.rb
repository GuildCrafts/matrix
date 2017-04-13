require 'json'

SKILL_TREE = File.expand_path('../../data/skills.json', __FILE__)

SKILLS = JSON.parse(File.read(SKILL_TREE))

subgroups_without_goals = []
high_pri_subgroups_without_goals = []
total_section_count = 0
total_group_count = 0
total_subgroup_count = 0
total_high_pri_subgroup_count = 0
total_skillset_count = 0

puts "Analyzing skill tree..."
puts ""

SKILL_GROUPS = []

SKILLS.each do |section|
  section['groups'] = section['groups'].reject { |g| g['group'] =~ /template/i }

  total_section_count += 1

  section_name = section['section']
  groups = section['groups']

  groups.each do |group|
    total_group_count += 1

    group_name = group['group']
    subgroups = group['subgroups']

    subgroups.each do |subgroup|
      total_subgroup_count += 1

      level = subgroup['level']
      goal_count = subgroup['goals'] ? subgroup['goals'].count : 0
      skillset_count = subgroup['skillsets'].count
      has_resources = subgroup['resources']

      total_high_pri_subgroup_count += 1 if (1..2).include?(level.to_i)
      total_skillset_count += skillset_count

      subgroup_path = "#{section_name}::#{group_name}::#{level}"

      if goal_count.zero?
        subgroups_without_goals << subgroup_path
        high_pri_subgroups_without_goals << subgroup_path if (1..2).include?(level.to_i)
      end

      SKILL_GROUPS << {
        path: subgroup_path,
        goal_count: goal_count,
        skillset_count: skillset_count,
        has_resources: has_resources ? 'T' : 'F'
      }
    end
  end
end

def format_skill_groups(skill_groups)
  headers = %w[ SKILL GOALS SKILLSETS RESOURCES ]
  separator = ' | '

  max_width_path = skill_groups.max_by { |sg| sg[:path].length }[:path].length
  headers[0] = headers[0].ljust(max_width_path)
  header_row = headers.join(separator)

  skill_groups.map do |sg|
    [
      sg[:path].ljust(max_width_path),
      sg[:goal_count].to_s.ljust(headers[1].length),
      sg[:skillset_count].to_s.ljust(headers[2].length),
      sg[:has_resources].ljust(headers[3].length)
    ].join(separator)
  end.unshift("-" * header_row.length).unshift(header_row)
end

puts format_skill_groups(SKILL_GROUPS)

puts
puts "=" * 10
puts

puts "Total Section Count = #{total_section_count}"
puts "Total Group Count = #{total_group_count}"
puts "Total Subgroup Count = #{total_subgroup_count}"
puts "Total High Pri Subgroup Count = #{total_high_pri_subgroup_count}"
puts "Total Skillset Count = #{total_skillset_count}"

puts '-' * 10

puts "High Pri Subgroups without Goals = #{high_pri_subgroups_without_goals.count} / #{total_high_pri_subgroup_count}"
puts "All Subgroups without Goals = #{subgroups_without_goals.count} / #{total_subgroup_count}"

puts '-' * 10
puts

puts "High Pri Subgroups without Goals:"
puts "- " + high_pri_subgroups_without_goals.join("\n- ")
