**There are a lot of things left to do here, including better packaging,
restructuring, and docs.  I don't recommend using this at all yet!
However, if you can offer advice, criticism or even contributions, each
would be most welcome!**


About
=====

This is a set of AngularJS directives to get dynamic functionality
from tables, according to our `Requirements Document`_.

.. _Requirements Document: https://docs.google.com/document/d/1Oopdm4KVcurmwe3WT1vaJDxVNq99xDvmmAuyu538jMw/edit?usp=sharing


Installation
============

- You need node.js (0.8+), npm, and Ruby.
- You need to install Compass: ``gem install compass``
- You need Grunt and Bower: ``npm install -g grunt-cli bower``
- Install: ``npm install && bower install``
- Run server: ``grunt server``


Development
===========

This project is currently a prototype.  I'm investigating what could
work as a set of directives, and I'm waiting to get that stable before
I start structuring the directives for packaging.

This is certainly going to change considerably quite soon to make
the solution repackageable, but the major files worth paying attention
to (the ones containing actual logic are):

- ``app/scripts/angular-table.js``
- ``app/scripts/controllers/main.js``
- ``app/views/main.html``


Features
=======

- Interface to table rows and columns, for other extensions.
- Sorting.
- Show/hide columns.
- Save and restore table states.
