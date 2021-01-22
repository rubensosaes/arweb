#!/bin/sh

# If in continuous integration, the npm "ci" script is going to take care of the
# the project setup completely, so the postinstall setup would be redundant.

if [ -z $CI ] || [ $CI != "true" ]
then
  npm run bootstrap
  npm run compile-commonjs
fi
