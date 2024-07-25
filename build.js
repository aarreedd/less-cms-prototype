console.log('')
console.log('Building CMS...')

var fs = require('fs')
  , fm = require('front-matter')
  , dot = require('dot-object')
  , path = require('path')
  , showdown  = require('showdown')
  , snakeCase = require('snake-case')
  , converter = new showdown.Converter()
  , excerptHtml = require('excerpt-html')

var dist = "dist"
var src = "src"
var manifest = {};

// delete the existing distribution directory
fs.rmSync(dist, { recursive: true, force: true })
// copy all files to distribution
fs.cpSync(path.join(src), path.join(dist), {recursive: true})

// get all markdown files
files = getFilesInDir(src)
files = files.filter(file => file.endsWith('.md'))
// for each markdown file, convert it to json and copy to distribution
for (const file of files) {
	var content = fs.readFileSync(file, 'utf8')
	// get front-matter content in json format
	var frontMatter = fm(content)
	var json = JSON.stringify(frontMatter, null, 2);
	var destFile = file.replace(src, dist).replace('.md','.json')
	// format frontMatter keys
	var attributes = {}
	for (const [key, value] of Object.entries(frontMatter.attributes)) {
		attributes[snakeCase.snakeCase(key)] = value
	}
	// add frontMatter content to manifest
	key = file.split(path.sep).slice(1).join(path.sep).split('.').slice(0, -1).join('.').replace(path.sep,'.')
	dot.str(key,attributes,manifest)
	dot.str(key+'.source',destFile.split(path.sep).slice(1).join(path.sep),manifest)
	dot.str(key+'.excerpt', excerptHtml(converter.makeHtml(frontMatter.body)), manifest)
	dot.str(key+'.slug', path.parse(file).name, manifest)
	dot.str(key+'.path', file.split(path.sep).slice(1).join(path.sep).split('.').slice(0, -1).join('.'), manifest)
	// write json to output destination
	fs.writeFileSync(destFile, json, 'utf8')

}
// Output manifest
manifestJson = JSON.stringify(manifest, null, 2);
fs.writeFileSync(path.join(dist, 'manifest.json'), manifestJson, 'utf8')

console.log('')
for (const [type, items] of Object.entries(manifest)) {
	console.log(type + ": " + Object.keys(items).length)
}
console.log('')

console.log('DONE');

/**
 * Functions
 */
function getFilesInDir(dir, fileList = []) {
	// Read the directory contents
	const files = fs.readdirSync(dir);

	// Loop through each file/directory
	files.forEach(file => {
		// Construct the absolute path
		const filePath = path.join(dir, file);

		// Get file stats
		const stat = fs.statSync(filePath);

		// If it's a directory, recurse into it, otherwise add to fileList
		if (stat.isDirectory()) {
			getFilesInDir(filePath, fileList);
		} else {
			fileList.push(filePath);
		}
	});

	return fileList;
}