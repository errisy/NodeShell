# NodeShell
Monitor and restart a script when it is changed.

## What for?
When you develop a new node js script, you may want to restart it once it is changed.

This script watch the file and will kill the running child process and start a new one.

This is particular useful when you are developing a kind of service that must run all the time.
