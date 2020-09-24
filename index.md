<ul>
  {% for post in https://bitpupper.github.io/.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
