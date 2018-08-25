SOURCES=$(wildcard _source/*.Rmd)
MD_OBJECTS=$(SOURCES:.Rmd=.md)
DRAFT_DIR=_drafts
DRAFT_MD_OBJECTS := $(addprefix $(DRAFT_DIR)/,$(notdir $(MD_OBJECTS)))
RSCRIPT=Rscript
BUNDLE := bundle
JEKYLL := $(BUNDLE) exec jekyll

PROJECT_DEPS := Gemfile

serve: install posts
	bundle exec jekyll serve --drafts

posts: $(MD_OBJECTS)

check:
	$(JEKYLL) doctor

install: $(PROJECT_DEPS)
	$(BUNDLE) install

update: $(PROJECT_DEPS)
	$(BUNDLE) update

clean:
	-rm -rf _serve
	-rm $(MD_OBJECTS)
	-rm $(DRAFT_MD_OBJECTS)

%.md: %.Rmd
	$(RSCRIPT) -e 'library(knitr); knitr::opts_knit$$set(base.dir = "$(PWD)", base.url = "/"); knit("$<", output="$@")'
	mv $@ _drafts
