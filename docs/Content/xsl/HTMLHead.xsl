<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
xmlns:exsl="http://exslt.org/common" xmlns:dyn="http://exslt.org/dynamic">
<xsl:output method="html"/>
<xsl:param name="param1"/>

<xsl:variable name="file1" select="document(../xml/common.xml")/>


<xsl:template match="Document">

    
    <html>
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <title><xsl:value-of select="Title"/></title>
        <meta name="description" content=""/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        
        <link rel="stylesheet" href="styles.css"/>

        <meta property="og:title">
            <xsl:attribute name="content">
                <xsl:value-of select="Title"/>
            </xsl:attribute>
        </meta>

<xsl:variable name="foo1">
    <xsl:value-of select="exsl:node-set($param1)"/>
</xsl:variable>
<xsl:variable name="path" select ="$foo1"/>
 <xsl:variable name="og-description" select="$path">
        </xsl:variable>


<xsl:element name="foo">foo
</xsl:element>

    
 PARAM1: param1:<xsl:value-of select="$og-description"/>ARAM1: ******* 

        <meta property="og:description">
            <xsl:attribute name="content">  
                <xsl:value-of select="dyn:evaluate('$og-description')"/>
            </xsl:attribute>
        </meta>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content=""/>
        <meta property="og:image" content="image.png"/>

        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"/>

    </head>

    <body>
        <xsl:value-of select="BodyContent"/>
        <xsl:value-of select="$param1"/>
        
    </body>
    </html>
</xsl:template>

</xsl:stylesheet>