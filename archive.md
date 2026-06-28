---
layout: page
title: Blog Archive
---

{%- assign tags_sorted = site.tags | sort -%}
{% for tag in tags_sorted %}
  <h3>{{ tag[0] }}</h3>
  <ul>
    {%- assign posts_in_tag = tag[1] | sort: 'date' | reverse -%}
    {% for post in posts_in_tag %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
