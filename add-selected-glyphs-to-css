
#MenuTitle: AddSelectedGlyphsToCSS
# -*- coding: utf-8 -*-
__doc__="""
Takes selected glyphs and outputs code for custom CSS classes to insert the new icons
"""
lineBreak = '\n'
glyphname = 'b'
thisFont = Glyphs.font
myGlyph = thisFont.glyphs[glyphname]
cssIconList = []
listOfSelectedGlyphs = [l.parent for l in thisFont.selectedLayers]

for myGlyph in listOfSelectedGlyphs:
	myGlyphUnicodeString = str(myGlyph.unicode)
	cssIconComponent = '.se-' + myGlyph.name + ':before {' + lineBreak + '    content: "\\' + myGlyphUnicodeString.lower() + '";' + lineBreak + '}' 
	cssIconList.append( cssIconComponent )
	
clipboardText = separator.join( cssIconList )
print clipboardText

def setClipboard( myText ):
	"""
	Sets the contents of the clipboard to myText.
	Returns True if successful, False if unsuccessful.
	"""
	try:
		myClipboard = NSPasteboard.generalPasteboard()
		myClipboard.declareTypes_owner_( [NSStringPboardType], None )
		myClipboard.setString_forType_( myText, NSStringPboardType )
		return True
	except Exception as e:
		return False

if not setClipboard(clipboardText):
	print "Warning: could not set clipboard to %s" % ( clipboardText )
