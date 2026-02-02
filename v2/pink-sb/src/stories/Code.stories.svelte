<script context="module" lang="ts">
    import { Code } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    const codeExample = `
    import { writable } from 'svelte/store';

export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
export const count = writable(0);
    `;

    export const meta: MetaProps = {
        title: 'Components/Code',
        component: Code,
        args: {
            code: codeExample,
            lineNumbers: true
        },
        argTypes: {
            lang: {
                options: [
                    'js',
                    'javascript',
                    'dart',
                    'ts',
                    'typescript',
                    'xml',
                    'html',
                    'sh',
                    'md',
                    'json',
                    'swift',
                    'php',
                    'diff',
                    'python',
                    'ruby',
                    'csharp',
                    'kotlin',
                    'java',
                    'cpp',
                    'bash',
                    'powershell',
                    'cmd',
                    'yaml',
                    'text',
                    'graphql',
                    'http',
                    'go',
                    'py',
                    'rb',
                    'cs',
                    'css',
                    'groovy',
                    'ini',
                    'txt',
                    'dotenv'
                ],
                control: { type: 'select' }
            }
        }
    };
</script>

<script lang="ts">
    import { Layout } from '$lib/index.js';
    import Select from '$lib/input/Select.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import type { BuiltinLanguage, PlainTextLanguage } from 'shiki';

    type Language = BuiltinLanguage | PlainTextLanguage;

    const examples: Record<string, string> = {
        javascript: `const greeting = "Hello World";
console.log(greeting);`,
        typescript: `interface User {
  name: string;
  age: number;
}

const user: User = { name: "Alice", age: 30 };`,
        python: `def fibonacci(n):
  if n <= 1:
    return n
  return fibonacci(n-1) + fibonacci(n-2)`,
        dart: `class Person {
  String name;
  int age;

  Person(this.name, this.age);
}`,
        swift: `struct Point {
  var x: Double
  var y: Double
}

let origin = Point(x: 0.0, y: 0.0)`,
        kotlin: `data class User(val name: String, val age: Int)

val user = User("Bob", 25)`,
        java: `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
        csharp: `public class Program {
  public static void Main() {
    Console.WriteLine("Hello World");
  }
}`,
        cpp: `#include <iostream>

int main() {
  std::cout << "Hello World" << std::endl;
  return 0;
}`,
        go: `package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,
        ruby: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end`,
        php: `<?php
class User {
  public $name;
  public $email;

  public function __construct($name, $email) {
    $this->name = $name;
    $this->email = $email;
  }
}`,
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
        css: `.button {
  background: var(--brand-pink-500);
  padding: 8px 16px;
  border-radius: 4px;
  color: white;
}`,
        json: `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}`,
        yaml: `name: John Doe
age: 30
email: john@example.com
hobbies:
  - reading
  - coding`,
        bash: `#!/bin/bash

echo "Hello World"
for i in {1..5}; do
  echo "Count: $i"
done`,
        powershell: `$greeting = "Hello World"
Write-Host $greeting

1..5 | ForEach-Object {
  Write-Host "Count: $_"
}`,
        graphql: `query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    posts {
      title
    }
  }
}`,
        md: `# Hello World

This is a **markdown** document with:
- Lists
- Links: [Example](https://example.com)
- Code: \`inline code\``,
        diff: `diff --git a/file.js b/file.js
index 1234567..abcdefg 100644
--- a/file.js
+++ b/file.js
@@ -1,5 +1,5 @@
-const oldValue = 42;
+const newValue = 100;

 function update() {
-  return oldValue;
+  return newValue;
 }`,
        http: `GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
Content-Type: application/json`,
        groovy: `class Person {
  String name
  int age
}

def person = new Person(name: "Alice", age: 30)`,
        ini: `[database]
host=localhost
port=5432
name=mydb

[server]
port=8080`,
        dotenv: `API_KEY=abc123
DATABASE_URL=postgresql://localhost:5432/mydb
DEBUG=true`
    };

    const langOptions: Array<{ label: string; value: Language }> = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'Dart', value: 'dart' },
        { label: 'Swift', value: 'swift' },
        { label: 'Kotlin', value: 'kotlin' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'C++', value: 'cpp' },
        { label: 'Go', value: 'go' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'PHP', value: 'php' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'JSON', value: 'json' },
        { label: 'YAML', value: 'yaml' },
        { label: 'Bash', value: 'bash' },
        { label: 'PowerShell', value: 'powershell' },
        { label: 'GraphQL', value: 'graphql' },
        { label: 'Markdown', value: 'md' },
        { label: 'Diff', value: 'diff' },
        { label: 'HTTP', value: 'http' },
        { label: 'Groovy', value: 'groovy' },
        { label: 'INI', value: 'ini' },
        { label: 'DotEnv', value: 'dotenv' }
    ];

    let selectedLang: Language = 'javascript';
    $: code = examples[selectedLang] || '';
</script>

<Template let:args>
    <Code {...args} />
</Template>

<Story name="Default" />

<Story name="No header" args={{ hideHeader: true }} />

<Story name="Language Examples">
    <Layout.Stack gap="l">
        <Select bind:value={selectedLang} options={langOptions} placeholder="Select a language" />

        <Code {code} lang={selectedLang} lineNumbers />
    </Layout.Stack>
</Story>
