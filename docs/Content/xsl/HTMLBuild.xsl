<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>

<xsl:param name="file1"/>
<xsl:variable name="file" select="document(concat('../html/', $file1, '.html'))"/>

<xsl:variable name="site-header-file" select="document('../html/SiteHeader.html')"/>
<xsl:variable name="site-footer-file" select="document('../html/SiteFooter.html')"/>

<xsl:template match="Document">
     <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
    <html lang="en">
        <head>
            <xsl:call-template name="head"/>
        </head>
        <body>
            <xsl:call-template name="site-header"/>
            <main>
            <xsl:call-template name="body"/>

             <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            </main> 
            <xsl:call-template name="site-footer"/>
        </body>
    </html>
</xsl:template>

<xsl:template name="site-footer">
    <xsl:copy-of select="$site-footer-file"/>
</xsl:template>

<xsl:template name="site-header">
    <xsl:copy-of select="$site-header-file"/>
</xsl:template>

<xsl:template name="body">
    <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
    <xsl:copy-of select="$file"/>

</xsl:template>

<xsl:template name= "head">
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="description">
            <xsl:attribute name="content">
                <xsl:value-of select="Description"/>
            </xsl:attribute>
        </meta>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

                <script async="true" src="//iframely.net/embed.js"></script>
                
         <!-- Import Google Icon Font -->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <!-- Compiled and minified Materialize CSS -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>


          <link
      type="text/css" rel="stylesheet" href="../css/materialize.min.css"/>

          <link
      type="text/css" rel="stylesheet" href="../css/style.css"/>

<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      
        
        <title><xsl:value-of select="Title"/></title>
        
        <meta property="og:title">
            <xsl:attribute name="content">
                <xsl:value-of select="Title"/>
            </xsl:attribute>
        </meta>

        <meta property="og:description">
            <xsl:attribute name="content">
                <xsl:value-of select="Description"/>
            </xsl:attribute>
        </meta>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content=""/>
        <meta property="og:image" content="image.png"/>
    
        <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png"/>
</xsl:template>

</xsl:stylesheet>   