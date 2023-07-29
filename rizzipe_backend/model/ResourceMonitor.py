import time
from threading import Thread

import psutil
import torch.cuda
from GPUtil import GPUtil


class Monitor(Thread):
    def __init__(self, delay):
        super(Monitor, self).__init__()
        self.stopped = False
        self.delay = delay  # Time between calls to GPUtil
        self.start()
        self.max_cpu = 0.0
        self.max_mem = 0.0
        self.max_gpu = 0.0

    def run(self):
        while not self.stopped:
            # Obtaining all the essential details
            cpu_usage = psutil.cpu_percent()
            mem_usage = psutil.virtual_memory().percent
            print(f"\nCPU Usage: {cpu_usage}%")
            print(f"Memory Usage: {mem_usage}%")

            if torch.cuda.is_available():
                print("GPU Usage:")
                GPUtil.showUtilization()
                GPUs = GPUtil.getGPUs()
                gpu_usage = GPUs[0].load * 100

                # save maximum resource usage only if GPU exists
                if gpu_usage > self.max_gpu:
                    self.max_gpu = gpu_usage

            # save maximum resource usage
            if cpu_usage > self.max_cpu:
                self.max_cpu = cpu_usage
            if mem_usage > self.max_mem:
                self.max_mem = mem_usage

            time.sleep(self.delay)

    def stop(self):
        self.stopped = True

        return self.max_cpu, self.max_mem, self.max_gpu
