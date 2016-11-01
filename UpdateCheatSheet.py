
#MenuTitle: Update SE Icons Cheat Sheet with Selected Glyphs
# -*- coding: utf-8 -*-
__doc__="""
Takes selected glyph names and 
"""
lineBreak = '\n'
glyphname = 'b'
thisFont = Glyphs.font
myGlyph = thisFont.glyphs[glyphname]
cssIconList = []
listOfSelectedGlyphs = [l.parent for l in thisFont.selectedLayers]

for myGlyph in listOfSelectedGlyphs:
	cssIconComponent = '<li class="icon-child"><div class="iconTitle">' + myGlyph.name + '</div><div class="se-icons cheatSheetIcon se-' + myGlyph.name + '"></div><div class="unicodeChar"> unicode: <code>' + myGlyph.unicode + '</code></div></li>' + lineBreak
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
