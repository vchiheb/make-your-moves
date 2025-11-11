<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes"/>

  <xsl:variable name="file1" select="document('../xml/common.xml')"/>
  <xsl:variable name="file2" select="document('../xml/index.xml')"/>

  <xsl:template match="/">
    <CombinedData>
      <xsl:copy-of select="$file1/RootElementA"/>
      <xsl:copy-of select="$file2/RootElementB"/>
      <!-- You can process and combine data from both files here -->
    </CombinedData>
  </xsl:template>

</xsl:stylesheet>