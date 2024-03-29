FROM library/node:lts-bookworm

ARG DEBIAN_FRONTEND=noninteractive
RUN apt update \
    && apt install -y --no-install-recommends sudo \
    && apt autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && echo "node ALL=(ALL) NOPASSWD: ALL" >/etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y install --no-install-recommends \
    xorg \
    openbox \
    libnss3 \
    libasound2 \
    libatk-adaptor \
    libgtk-3-0 rpm dpkg fakeroot

ENV DBUS_SESSION_BUS_ADDRESS="autolaunch:" \
	VNC_RESOLUTION="1440x768x16" \
	VNC_DPI="96" \
	VNC_PORT="5901" \
	NOVNC_PORT="6080" \
	DISPLAY=":1" \
	LANG="en_US.UTF-8" \
	LANGUAGE="en_US.UTF-8"
